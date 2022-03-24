using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Hackathon4Ukraine_Team2_App.Domain
{
    public class RequestHelp
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(maximumLength: 30, MinimumLength = 1, ErrorMessage = "Name must be between 1 and 30 characters.")]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(maximumLength: 25, MinimumLength = 1, ErrorMessage = "Email must be between 1 and 50 characters.")]
        public string Email { get; set; }

        public string Category { get; set; }

        [Required]
        [StringLength(maximumLength: 5000, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 5000 characters.")]
        public string Description { get; set; }

        public override string? ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}