using System;
using System.Collections.Generic;
using System.Web.Mvc;
using createsend_dotnet;
using USN.USNModels;
using Umbraco.Web;
using System.Web.UI.WebControls;
using MailChimp;
using MailChimp.Helper;
using MailChimp.Lists;
using USNStarterKit.USNHelpers;
using System.Web;
using USNOptions = USNStarterKit.USNEnums.Options;
using Newtonsoft.Json.Linq;
using System.Net;

namespace USN.USNControllers
{
    /// <summary>
    /// Not using strongly typed models here so that PureLive mode can be used
    /// </summary>
    public class USNContactFormSurfaceController : Umbraco.Web.Mvc.SurfaceController
    {

        public ActionResult Index(int NodeID, int GlobalSettingsID, string DataSize)
        {
            var model = new USNContactFormViewModel();
            model.CurrentNodeID = NodeID;
            model.GlobalSettingsID = GlobalSettingsID;
            model.CaptchaDataSize = DataSize;

            return PartialView("USNForms/USN_ContactForm", model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult HandleContactSubmit(USNContactFormViewModel model)
        {
            System.Threading.Thread.Sleep(1000);

            //Need to get NodeID from hidden field. CurrentPage does not work with Ajax.BeginForm
            var contactFormNode = Umbraco.TypedContent(model.CurrentNodeID);
            var globalSettings = Umbraco.TypedContent(model.GlobalSettingsID);

            string returnValue = String.Empty;
            string recaptchaReset = globalSettings.HasValue("googleReCAPTCHASiteKey") && globalSettings.HasValue("googleReCAPTCHASecretKey") ? "grecaptcha.reset();" : String.Empty;

            if (!ModelState.IsValid)
            {
                return JavaScript(String.Format("{0}$(ContactError{1}).show();$(ContactError{1}).html('{2}');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Contact Form General Error"))));
            }

            if (globalSettings.HasValue("googleReCAPTCHASiteKey") && globalSettings.HasValue("googleReCAPTCHASecretKey"))
            {
                var response = Request["g-recaptcha-response"];
                string secretKey = globalSettings.GetPropertyValue<string>("googleReCAPTCHASecretKey");
                var client = new WebClient();
                var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
                var obj = JObject.Parse(result);
                var status = (bool)obj.SelectToken("success");

                if(!status)
                {
                    return JavaScript(String.Format("{0}$(ContactError{1}).show();$(ContactError{1}).html('{2}');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Form reCAPTCHA Error"))));
                }
            }

            string mailTo = contactFormNode.GetPropertyValue<string>("contactRecipientEmailAddress");
            string websiteName = globalSettings.GetPropertyValue<string>("websiteName");
            string pageName = contactFormNode.Parent.Parent.Name;

            string errorMessage = String.Empty;

            if (!SendContactFormMail(model, mailTo, websiteName, pageName, out errorMessage))
            {
                return JavaScript(String.Format("{0}$(ContactError{1}).show();$(ContactError{1}).html('<div class=\"info\"><p>{2}</p><p>{3}</p></div>');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Contact Form Mail Send Error")), HttpUtility.JavaScriptStringEncode(errorMessage)));
            }

            try
            {
                if (model.NewsletterSignup && globalSettings.HasValue("newsletterAPIKey") &&
                    (globalSettings.HasValue("defaultNewsletterSubscriberListID") || contactFormNode.HasValue("contactSubscriberListID")))
                {
                    if (globalSettings.GetPropertyValue<USNOptions>("emailMarketingPlatform") == USNOptions.Newsletter_CM)
                    {
                        AuthenticationDetails auth = new ApiKeyAuthenticationDetails(globalSettings.GetPropertyValue<string>("newsletterAPIKey"));

                        string subsciberListID = String.Empty;

                        if (contactFormNode.HasValue("contactSubscriberListID"))
                            subsciberListID = contactFormNode.GetPropertyValue<string>("contactSubscriberListID");
                        else
                            subsciberListID = globalSettings.GetPropertyValue<string>("defaultNewsletterSubscriberListID");

                        Subscriber loSubscriber = new Subscriber(auth, subsciberListID);

                        List<SubscriberCustomField> customFields = new List<SubscriberCustomField>();

                        string subscriberID = loSubscriber.Add(model.Email, model.FirstName + " " + model.LastName, customFields, false);
                    }
                    else if (globalSettings.GetPropertyValue<USNOptions>("emailMarketingPlatform") == USNOptions.Newsletter_Mailchimp)
                    {

                        var mc = new MailChimpManager(globalSettings.GetPropertyValue<string>("newsletterAPIKey"));

                        string subsciberListID = String.Empty;

                        if (contactFormNode.HasValue("contactSubscriberListID"))
                            subsciberListID = contactFormNode.GetPropertyValue<string>("contactSubscriberListID");
                        else
                            subsciberListID = globalSettings.GetPropertyValue<string>("defaultNewsletterSubscriberListID");

                        var email = new EmailParameter()
                        {
                            Email = model.Email
                        };

                        var myMergeVars = new MergeVar();
                        myMergeVars.Add("FNAME", model.FirstName);
                        myMergeVars.Add("LNAME", model.LastName);

                        EmailParameter results = mc.Subscribe(subsciberListID, email, myMergeVars, "html", false, true, false, false);
                    }
                }
            }
            catch (Exception ex)
            {
                return JavaScript(String.Format("{0}$(ContactError{1}).show();$(ContactError{1}).html('<div class=\"info\"><p>{2}</p><p>{3}</p></div>');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Contact Form Signup Error")), HttpUtility.JavaScriptStringEncode(ex.Message)));
            }

            returnValue = String.Format("<div class=\"spc alert alert-success alert-dismissible fade in\" role=\"alert\"><div class=\"info\">{0}</div></div>", contactFormNode.GetPropertyValue<string>("contactSubmissionMessage"));

            return Content(returnValue);
        }

        public static bool SendContactFormMail(USNContactFormViewModel model, string mailTo, string websiteName, string pageName, out string lsErrorMessage)
        {
            lsErrorMessage = String.Empty;

            try
            {
                //Create MailDefinition 
                MailDefinition md = new MailDefinition();
                string lsSendTo = String.Empty;

                //specify the location of template 
                md.BodyFileName = "/usn/emailtemplates/contactform.htm";
                md.IsBodyHtml = true;

                //Build replacement collection to replace fields in template 
                System.Collections.Specialized.ListDictionary replacements = new System.Collections.Specialized.ListDictionary();
                replacements.Add("<% formFirstName %>", model.FirstName == null ? "" : model.FirstName);
                replacements.Add("<% formLastName %>", model.LastName == null ? "" : model.LastName);
                replacements.Add("<% formEmail %>", model.Email == null ? "" : model.Email);
                replacements.Add("<% formPhone %>", model.Telephone == null ? "" : model.Telephone);
                replacements.Add("<% formMessage %>", model.Message == null ? "" : umbraco.library.ReplaceLineBreaks(model.Message));
                replacements.Add("<% WebsitePage %>", pageName);
                replacements.Add("<% WebsiteName %>", websiteName);

                lsSendTo = mailTo;

                //now create mail message using the mail definition object 
                System.Net.Mail.MailMessage msg = md.CreateMailMessage(lsSendTo, replacements, new System.Web.UI.Control());
                msg.ReplyToList.Add(model.Email);
                msg.Subject = websiteName + " Website: " + pageName + " Page Enquiry";

                //this uses SmtpClient in 2.0 to send email, this can be configured in web.config file.
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
                smtp.Send(msg);

                return true;
            }
            catch (Exception ex)
            {
                lsErrorMessage = ex.Message;
            }

            return false;
        }
    }
}