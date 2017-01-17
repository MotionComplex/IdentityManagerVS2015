using System;
using System.Net;
using System.Net.Http;
using Basenet.Educase.IdentityManager.Facade.Client;
using Basenet.Educase.IdentityManager.Facade.Models;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ClientController : ControllerBase
    {
        public HttpResponseMessage Get()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var clientService = Container.Resolve<IClientFacade>();
                var clients = clientService.GetClients();
                var response = Request.CreateResponse(HttpStatusCode.OK, clients);

                return response;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
        
        public HttpResponseMessage Put(Client client)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            try
            {
                var clientService = Container.Resolve<IClientFacade>();
                clientService.AddOrUpdateClient(client);

                var responseMessage = CreateSuccessResponseMessage();

                return responseMessage;
            }
            catch (Exception ex)
            {
                return CreateErrorResponseMessage(ex);
            }
        }
    }
}
