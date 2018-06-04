using ReactChallengeApp.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ReactChallengeApp.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UsersController : ApiController
    {

        private ReactChallengeModel db = new ReactChallengeModel();

        // GET: api/Users
        public IQueryable<ActiveUser> GetUsers()
        {
            var images = db.Images.ToList();
            var users = db.Users.ToList();
            return db.Users.Join(db.Images,
                                u => u.UserId,
                                i => i.ImageId,
                                (u, i) => new ActiveUser
                                {
                                    Id = u.UserId,
                                    Name = u.Name,
                                    Age = u.Age,
                                    Phrase = u.Phrase,
                                    Image = i.Name,
                                    Phone = u.Phone
                                });
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(ActiveUser))]
        public async Task<IHttpActionResult> PostUser(ActiveUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (db.Users.Where(u => u.Name == user.Name).Count() > 0)
                {
                    throw new Exception("This user is already exist");
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }

            var plainUser = new User
            {
                //Id = user.Id,
                Age = user.Age,
                Name = user.Name,
                Phone = user.Phone,
                Phrase = user.Phrase
            };

            var image = new Image
            {
                //ImageId = user.Id,
                Name = user.Image
            };

            db.Users.Add(plainUser);
            db.Images.Add(image);

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = plainUser.UserId }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User user = await db.Users.FindAsync(id);
            Image image = await db.Images.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Images.Remove(image);
            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }
}