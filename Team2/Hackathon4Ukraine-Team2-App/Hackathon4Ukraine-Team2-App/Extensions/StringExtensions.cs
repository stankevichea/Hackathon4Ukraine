namespace Hackathon4Ukraine_Team2_App.Extensions;

public static class StringExtensions
{
    public static bool IsNullOrEmpty(this string s)
    {
        return s == null || s.Length == 0;
    }
}
