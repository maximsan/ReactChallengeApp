namespace ReactChallengeApp
{
    using ReactChallengeApp.Models;
    using System.Data.Entity;

    public partial class ReactChallengeModel : DbContext
    {
        public ReactChallengeModel()
            : base("name=ReactChallengeContext")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
