using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.ModelBinding;
using Basenet.Educase.IdentityManager.Facade.Claim;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ClaimController : ControllerBase
    {
        public HttpResponseMessage Get()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var claimService = Container.Resolve<IClaimFacade>();
                var claims = claimService.GetClaims();

                return Request.CreateResponse(HttpStatusCode.OK, claims);
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }

        public HttpResponseMessage Get(Guid uid)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var claimService = Container.Resolve<IClaimFacade>();
                var claims = claimService.GetAssignedClaims(uid);

                return Request.CreateResponse(HttpStatusCode.OK, claims);
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
