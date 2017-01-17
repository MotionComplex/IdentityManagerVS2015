using System;
using System.Net;
using System.Net.Http;
using Basenet.Educase.IdentityManager.Facade;
using Basenet.Educase.IdentityManager.Facade.Models;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class UserAccountController : ControllerBase
    {
        public HttpResponseMessage Put(Guid mandatorUID, UserAccount userAccount)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var userAccountService = Container.Resolve<IAccountFacade>();

                userAccountService.AddOrUpdateAccount(mandatorUID, userAccount);

                return CreateSuccessResponseMessage();
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
