using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.IdentityManager.Facade.Claim;
using Basenet.Educase.IdentityManager.Facade.Client;
using Basenet.Educase.IdentityManager.Facade.Models;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ScopeToClaimController : ControllerBase
    {
        public HttpResponseMessage Put(ScopeToClaim body)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var claimService = Container.Resolve<IClaimFacade>();
                var response = CreateSuccessResponseMessage();

                claimService.UpdateScopeToClaims(body.Uid, body.Claims.ToList());

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
