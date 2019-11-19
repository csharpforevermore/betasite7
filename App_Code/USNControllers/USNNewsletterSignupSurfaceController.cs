using System;
using System.Collections.Generic;
using System.Web.Mvc;
using createsend_dotnet;
using USN.USNModels;
using Umbraco.Web;
using MailChimp;
using MailChimp.Helper;
using MailChimp.Lists;
using System.Web;
using USNOptions = USNStarterKit.USNEnums.Options;
using System.Net;
using Newtonsoft.Json.Linq;

namespace USN.USNControllers
{
    /// <summary>
    /// Not using strongly typed models here so that PureLive mode can be used
    /// </summary>
    public class USNNewsletterSignupSurfaceController : Umbraco.Web.Mvc.SurfaceController
    {
        public ActionResult Index(int NodeID, int GlobalSettingsID, string DataSize)
        {
            var model = new USNNewsletterFormViewModel();
            model.CurrentNodeID = NodeID;
            model.GlobalSettingsID = GlobalSettingsID;
            model.CaptchaDataSize = DataSize;

            return PartialView("USNForms/USN_NewsletterSignup", model);
        }

        [HttpPost]
        public ActionResult HandleNewsletterSubmit(USNNewsletterFormViewModel model)
        {
            System.Threading.Thread.Sleep(1000);

            var currentNode = Umbraco.TypedContent(model.CurrentNodeID);
            var globalSettings = Umbraco.TypedContent(model.GlobalSettingsID);

            string recaptchaReset = globalSettings.HasValue("googleReCAPTCHASiteKey") && globalSettings.HasValue("googleReCAPTCHASecretKey") ? "grecaptcha.reset();" : String.Empty;

            string lsReturnValue = String.Empty;

            if (!ModelState.IsValid)
            {
                return JavaScript(String.Format("{0}$(NewsletterError{1}).show();$(NewsletterError{1}).html('<div class=\"info\"><p>{2}</p></div>');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Newsletter Form General Error"))));
            }
            try
            {
                if (globalSettings.HasValue("googleReCAPTCHASiteKey") && globalSettings.HasValue("googleReCAPTCHASecretKey"))
                {
                    var response = Request["g-recaptcha-response"];
                    string secretKey = globalSettings.GetPropertyValue<string>("googleReCAPTCHASecretKey");
                    var client = new WebClient();
                    var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
                    var obj = JObject.Parse(result);
                    var status = (bool)obj.SelectToken("success");

                    if (!status)
                    {
                        return JavaScript(String.Format("{0}$(NewsletterError{1}).show();$(NewsletterError{1}).html('{2}');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Form reCAPTCHA Error"))));
                    }
                }

                if (globalSettings.GetPropertyValue<USNOptions>("emailMarketingPlatform") == USNOptions.Newsletter_CM)
                {
                    AuthenticationDetails auth = new ApiKeyAuthenticationDetails(globalSettings.GetPropertyValue<string>("newsletterAPIKey"));

                    string subsciberListID = String.Empty;

                    if (currentNode.GetPropertyValue<string>("newsletterSubscriberListID") != String.Empty)
                        subsciberListID = currentNode.GetPropertyValue<string>("newsletterSubscriberListID");
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

                    if (currentNode.HasValue("newsletterSubscriberListID"))
                        subsciberListID = currentNode.GetPropertyValue<string>("newsletterSubscriberListID");
                    else
                        subsciberListID = globalSettings.GetPropertyValue<string>("defaultNewsletterSubscriberListID");


                    var email = new EmailParameter()
                    {
                        Email = model.Email
                    };

                    var myMergeVars = new MergeVar();
                    myMergeVars.Add("FNAME", model.FirstName);
                    myMergeVars.Add("LNAME", model.LastName);

                    EmailParameter results = mc.Subscribe(subsciberListID,email, myMergeVars, "html", false, true, false, false);
                }

                lsReturnValue = String.Format("<div class=\"spc alert alert-success alert-dismissible fade in\" role=\"alert\"><div class=\"info\">{0}</div></div>", currentNode.GetPropertyValue<string>("newsletterSubmissionMessage"));
                return Content(lsReturnValue);
            }
            catch (Exception ex)
            {
                return JavaScript(String.Format("{0}$(NewsletterError{1}).show();$(NewsletterError{1}).html('<div class=\"info\"><p>{2}</p><p>{3}</p></div>');", recaptchaReset, model.CurrentNodeID, HttpUtility.JavaScriptStringEncode(umbraco.library.GetDictionaryItem("USN Newsletter Form Signup Error")), HttpUtility.JavaScriptStringEncode(ex.Message)));
            }
        }
    }
}