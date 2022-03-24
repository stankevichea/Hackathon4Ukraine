namespace Hackathon4Ukraine_Team2_App.Domain
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
    }
}
