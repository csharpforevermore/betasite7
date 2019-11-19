using System;
using Umbraco.Core.Models;
using USNStarterKit.USNBackgroundOptions.Models;

using USNOptions = USNStarterKit.USNEnums.Options;

namespace USN.USNTemplate
{
    public static class USNViewTemplateHelper
    {
        public static USNTemplateStyleSettings GetDefaultTemplateStyleSettings()
        {
            USNTemplateStyleSettings settings = new USNTemplateStyleSettings();

            settings.BackGroundStyle = "c5-bg";
            settings.HeadingStyle = "c3-text";
            settings.SecondaryHeadingStyle = "c1-text";
            settings.TextStyle = "base-text";
            settings.ButtonStyle = "c1-borders c1-text";

            return settings;
        }


        public static USNTemplateStyleSettings GetTemplateStyleSettings(string backgroundColor = null, string buttonColour = null)
        {
            USNTemplateStyleSettings settings = new USNTemplateStyleSettings();

            if (!String.IsNullOrEmpty(backgroundColor))
            {
                switch (backgroundColor)
                {
                    case "ec1b47":
                        settings.BackGroundStyle = "c1-bg";
                        settings.HeadingStyle = "c5-text";
                        settings.SecondaryHeadingStyle = "c5-text";
                        settings.TextStyle = "c5-text";
                        break;
                    case "202020":
                        settings.BackGroundStyle = "c2-bg";
                        settings.HeadingStyle = "c5-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "c4-text";
                        break;
                    case "080808":
                        settings.BackGroundStyle = "c3-bg";
                        settings.HeadingStyle = "c5-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "c4-text";
                        break;
                    case "f7f7f7":
                        settings.BackGroundStyle = "c4-bg";
                        settings.HeadingStyle = "c3-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "base-text";
                        break;
                    case "ffffff":
                        settings.BackGroundStyle = "c5-bg";
                        settings.HeadingStyle = "c3-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "base-text";
                        break;
                    case "dfdbdc":
                        settings.BackGroundStyle = "c6-bg";
                        settings.HeadingStyle = "c3-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "base-text";
                        break;
                    default:
                        settings.BackGroundStyle = "c5-bg";
                        settings.HeadingStyle = "c3-text";
                        settings.SecondaryHeadingStyle = "c1-text";
                        settings.TextStyle = "base-text";
                        break;
                }
            }
            else
            {
                settings.BackGroundStyle = "c5-bg";
                settings.HeadingStyle = "c3-text";
                settings.SecondaryHeadingStyle = "c1-text";
                settings.TextStyle = "base-text";
            }

            if (!String.IsNullOrEmpty(buttonColour))
            {
                switch (buttonColour)
                {
                    case "ec1b47":
                        settings.ButtonStyle = "c1-borders c1-text";
                        break;
                    case "202020":
                        settings.ButtonStyle = "c2-borders c2-text";
                        break;
                    case "080808":
                        settings.ButtonStyle = "c3-borders c3-text";
                        break;
                    case "f7f7f7":
                        settings.ButtonStyle = "c4-borders c4-text";
                        break;
                    case "ffffff":
                        settings.ButtonStyle = "c5-borders c5-text";
                        break;
                    case "dfdbdc":
                        settings.ButtonStyle = "c6-borders c6-text";
                        break;
                    default:
                        settings.ButtonStyle = "c1-borders c1-text";
                        break;
                }
            }
            else
            {
                settings.ButtonStyle = "c1-borders c1-text";
            }

            return settings;
        }

        public static string GetBackgroundImageStyle(IPublishedContent image = null, USNBackgroundOption backgroundImageOptions = null)
        {
            string output = String.Empty;
            string backgroundImage = String.Empty;
            string backgroundStyle = String.Empty;
            string backgroundPosition = String.Empty;

            if (image != null)
            {
                backgroundImage = String.Format("background-image:url('{0}');", image.Url);

                if (backgroundImageOptions != null)
                {
                    switch (backgroundImageOptions.Style)
                    {
                        case USNOptions.BG_Cover:
                            backgroundStyle = "background-repeat:no-repeat;background-size:cover;";
                            break;
                        case USNOptions.BG_FullWidth:
                            backgroundStyle = "background-repeat:no-repeat;background-size:100% auto;";
                            break;
                        case USNOptions.BG_Auto:
                            backgroundStyle = "background-repeat:no-repeat;background-size:auto;";
                            break;
                        case USNOptions.BG_Repeat:
                            backgroundStyle = "background-repeat:repeat;background-size:auto;";
                            break;
                        case USNOptions.BG_RepeatX:
                            backgroundStyle = "background-repeat:repeat-x;background-size:auto;";
                            break;
                        case USNOptions.BG_RepeatY:
                            backgroundStyle = "background-repeat:repeat-y;background-size:auto;";
                            break;
                        default:
                            backgroundStyle = "background-repeat:no-repeat;background-size:auto;";
                            break;
                    }

                    switch (backgroundImageOptions.Position)
                    {
                        case USNOptions.BG_TopCenter:
                            backgroundPosition = "background-position:center top;";
                            break;
                        case USNOptions.BG_CenterCenter:
                            backgroundPosition = "background-position:center center;";
                            break;
                        case USNOptions.BG_BottomCenter:
                            backgroundPosition = "background-position:center bottom;";
                            break;
                        case USNOptions.BG_TopRight:
                            backgroundPosition = "background-position:right top;";
                            break;
                        case USNOptions.BG_CenterRight:
                            backgroundPosition = "background-position:right center;";
                            break;
                        case USNOptions.BG_BottomRight:
                            backgroundPosition = "background-position:right bottom;";
                            break;
                        case USNOptions.BG_TopLeft:
                            backgroundPosition = "background-position:left top;";
                            break;
                        case USNOptions.BG_CenterLeft:
                            backgroundPosition = "background-position:left center;";
                            break;
                        case USNOptions.BG_BottomLeft:
                            backgroundPosition = "background-position:left bottom;";
                            break;
                        default:
                            backgroundPosition = "background-position:center center;";
                            break;

                    }

                }

                output = backgroundImage + backgroundStyle + backgroundPosition;

                if (output != String.Empty)
                {
                    output = String.Format(" style=\"{0}\"", output);
                }
            }

            return output;
        }

    }
}