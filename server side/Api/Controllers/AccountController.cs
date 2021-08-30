using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using core.Model;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using core.Model.Identity;
using Api.Dtos;
using AutoMapper;
using core.interfaces;
using Api.Extensions;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ItokenServices _tokenServices;
        private readonly IMapper _mapper;
        
        public AccountController(dataContext context,
        UserManager<AppUser> userManager,
         SignInManager<AppUser> signInManager,
         ItokenServices tokenServices,IMapper mapper)
        {
            _userManager=userManager;
            _signInManager=signInManager;
            _tokenServices=tokenServices;
            _mapper=mapper;
        }
        // Post: api/Account/login
         [HttpPost("login")]
            public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
            {
                var user = await _userManager.FindByEmailAsync(loginDto.Email);

                    if (user == null) return NotFound();

                    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                    if (!result.Succeeded) return BadRequest();
                    return new UserDto
                    {
                        Email = user.Email,
                        Token = _tokenServices.CreateToken(user),
                        DisplayName = user.DisplayName
                    };
            }
           // Post: api/Account/register
           
            [HttpPost("register")]
         public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
            {
                if (CheckEamilExist(registerDto.Email).Result.Value)
                {
                    return BadRequest("Sorry , this Address is in Use");
                }
                var user=new AppUser
                {
                    DisplayName=registerDto.DisplayName,
                    Email=registerDto.Email,
                    UserName=registerDto.Email
                };
                var result= await _userManager.CreateAsync(user,registerDto.Password);
                 if (!result.Succeeded) return BadRequest();

                return new UserDto
                    {
                        Email = user.Email,
                        Token = _tokenServices.CreateToken(user),
                        DisplayName = user.DisplayName
                    };
            }
            //get current user 
           // get: api/Account

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCrrentUser()
        {
           try
           {
                // var email=HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type==ClaimTypes.Email)?.Value;
            // var user=await _userManager.FindByEmailAsync(email);
            var user=await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

        
           return new UserDto
                    {
                        Email = user.Email,
                        Token = _tokenServices.CreateToken(user),
                        DisplayName = user.DisplayName
                        
                };
                  // var requestUser= await HttpContext.User.Where(x=>x.ApplicationUserID==clam.Value).ToListAsync();
                         
           }
           catch (System.Exception)
           {
               
               throw;
           }
        }
        //this function check email exist or no
        // get: api/Account/EmailExist?email=#
        [HttpGet("EmailExist")]
        public async Task<ActionResult<bool>> CheckEamilExist([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        // get: api/Account/Address
        [HttpGet("Address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            // var email=HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type==ClaimTypes.Email)?.Value;
            var user=await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
            return _mapper.Map<AddressDto>(user.Address);

            // return Ok(user.Address);
        }
        // [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserr(AddressDto address)
        {
            var user=await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
            user.Address=_mapper.Map<AddressDto,Address>(address);

             var result=await _userManager.UpdateAsync(user);
             if (result.Succeeded)
             {
                 return Ok(_mapper.Map<Address,AddressDto>(user.Address));
             }
            return BadRequest("Problem updating the user");

        }

    }
}
