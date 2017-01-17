using System;
using System.Net;
using System.Net.Http;
using Basenet.Educase.IdentityManager.Facade.Models;
using Basenet.Educase.IdentityManager.Facade.Scope;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ScopeController : ControllerBase
    {
        public HttpResponseMessage Get()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var scopeService = Container.Resolve<IScopeFacade>();
                var scopes = scopeService.GetScopes();
                var response = Request.CreateResponse(HttpStatusCode.OK, scopes);

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }

        public HttpResponseMessage Put(Scope scope)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var scopeService = Container.Resolve<IScopeFacade>();
                scopeService.AddOrUpdateScope(scope);

                var response = CreateSuccessResponseMessage();

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
