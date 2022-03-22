using System.Net;

namespace Hackathon4Ukraine_Team2_App.Helpers
{
    public static class NavigationHelper
    {
        public static string ViewRequestHelp(Guid guid) => $"/RequestHelp/{WebUtility.UrlEncode(guid.ToString())}";

    }
}
