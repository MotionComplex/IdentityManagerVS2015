using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Basenet.Educase.IdentityManager.Facade.Mandator;
using Basenet.Educase.IdentityManager.Facade.Models;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ClientToMandatorController : ControllerBase
    {
        public HttpResponseMessage Put(ClientToMandator body)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var mandatorService = Container.Resolve<IMandatorFacade>();
                var response = CreateSuccessResponseMessage();

                mandatorService.UpdateClientToMandators(body.Uid, body.Mandators.ToList());

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }

    }
}
