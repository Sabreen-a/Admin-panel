using core.Model.Identity;

namespace core.interfaces
{
    public interface ItokenServices
    {
         string CreateToken(AppUser user);
    }
}