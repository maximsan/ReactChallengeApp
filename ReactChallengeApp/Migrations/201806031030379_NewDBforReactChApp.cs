namespace ReactChallengeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewDBforReactChApp : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        ImageId = c.Int(nullable: false),
                        Name = c.String(),
                        URL = c.String(),
                    })
                .PrimaryKey(t => t.ImageId)
                .ForeignKey("dbo.Users", t => t.ImageId)
                .Index(t => t.ImageId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Age = c.Int(),
                        Phrase = c.String(),
                        Phone = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Images", "ImageId", "dbo.Users");
            DropIndex("dbo.Images", new[] { "ImageId" });
            DropTable("dbo.Users");
            DropTable("dbo.Images");
        }
    }
}
