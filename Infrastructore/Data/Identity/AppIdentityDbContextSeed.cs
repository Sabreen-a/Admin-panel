using System.Linq;
using System.Threading.Tasks;
using core.Model.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructore.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The street",
                        City = "New York",
                        State = "NY",
                        NumberHouse = "32"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

    }
}