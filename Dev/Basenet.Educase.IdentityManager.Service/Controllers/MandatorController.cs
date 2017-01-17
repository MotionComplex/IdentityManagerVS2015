using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Basenet.Educase.IdentityManager.Facade.Mandator;
using Microsoft.Practices.Unity;
using Newtonsoft.Json;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class MandatorController : ControllerBase
    {
        public HttpResponseMessage Get()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var mandatorService = Container.Resolve<IMandatorFacade>();
                var mandators = mandatorService.GetMandators();
                var response = Request.CreateResponse(HttpStatusCode.OK, mandators);

                return response;
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
                var mandatorService = Container.Resolve<IMandatorFacade>();
                var mandators = mandatorService.GetAssignedMandators(uid);
                var response = Request.CreateResponse(HttpStatusCode.OK, mandators);

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
