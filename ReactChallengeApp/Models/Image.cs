using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactChallengeApp.Models
{
    public class Image
    {
        [Key]
        [ForeignKey("User")]
        public int ImageId { get; set; }

        public string Name { get; set; }

        public string URL { get; set; }

        public User User { get; set; }
    }
}