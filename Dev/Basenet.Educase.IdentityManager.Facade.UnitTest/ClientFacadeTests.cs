using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.IdentityManager.Facade.Client;
using Basenet.Educase.IdentityManager.DataModel.Data;
using NUnit.Framework;
using NUnit.Framework.Internal;
using Moq;

namespace Basenet.Educase.IdentityManager.Facade.UnitTest
{
    [TestFixture]
    public class ClientFacadeTests
    {
        private readonly ISystemTime _systemTime;

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_ClientFacade_GetClients()
        {
            var clientsMock = new List<DataModel.Data.Client>
            {
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("D259986D-C8C5-4505-AD80-F2E4A7488069"),
                    Id = "client1",
                    Name = "Client 1",
                    Flow = "flow1"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("E7EC0E4F-44B5-4530-9B10-64BB617C0E78"),
                    Id = "client2",
                    Name = "Client 2",
                    Flow = "flow2"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("6FCDB137-FAAB-49D1-84EE-942B9571E91A"),
                    Id = "client3",
                    Name = "Client 3",
                    Flow = "flow3"
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Clients).Returns(clientsMock.MockDbSet().Object);

            var facade = new ClientFacade(context.Object, _systemTime);
            var clients = facade.GetClients().ToList();

            Assert.AreEqual(3, clients.Count);
            Assert.AreEqual(clients.FirstOrDefault().UID, clientsMock.FirstOrDefault().UID);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_ClientFacade_GetClient()
        {
            var expectedUid = Guid.Parse("D259986D-C8C5-4505-AD80-F2E4A7488069");
            var clientsMock = new List<DataModel.Data.Client>
            {
                new DataModel.Data.Client
                {
                    UID = expectedUid,
                    Id = "client1",
                    Name = "Client 1",
                    Flow = "flow1"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("E7EC0E4F-44B5-4530-9B10-64BB617C0E78"),
                    Id = "client2",
                    Name = "Client 2",
                    Flow = "flow2"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("6FCDB137-FAAB-49D1-84EE-942B9571E91A"),
                    Id = "client3",
                    Name = "Client 3",
                    Flow = "flow3"
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Clients).Returns(clientsMock.MockDbSet().Object);

            var facade = new ClientFacade(context.Object, _systemTime);
            var client = facade.GetClient(expectedUid);

            Assert.IsNotNull(client);
            Assert.AreEqual(client.UID, expectedUid);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_ClientFacade_AddOrUpdateClient_Add()
        {
            var newClient = new Models.Client
            {
                UID = Guid.Parse("CAC97BCB-86F6-4E69-92D8-70579223FC11"),
                Id = "newclient",
                Name = "New Client",
                Flow = "new flow"
            };

            var clients = new List<DataModel.Data.Client>
            {
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("D259986D-C8C5-4505-AD80-F2E4A7488069"),
                    Id = "client1",
                    Name = "Client 1",
                    Flow = "flow1"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("E7EC0E4F-44B5-4530-9B10-64BB617C0E78"),
                    Id = "client2",
                    Name = "Client 2",
                    Flow = "flow2"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("6FCDB137-FAAB-49D1-84EE-942B9571E91A"),
                    Id = "client3",
                    Name = "Client 3",
                    Flow = "flow3"
                }
            };

            var clientsMock = clients.MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Clients).Returns(clientsMock.Object);

            var facade = new ClientFacade(context.Object, _systemTime);
            facade.AddOrUpdateClient(newClient);

            // Checks if Add-method has been called exaclty one time
            clientsMock.Verify(exp => exp.Add(It.Is<DataModel.Data.Client>(c => c.UID == newClient.UID)), Times.Once);
            context.Verify(exp => exp.SaveChanges(), Times.Once);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_ClientFacade_AddOrUpdateClient_Update()
        {
            var clientToUpdate = new Models.Client
            {
                UID = Guid.Parse("D259986D-C8C5-4505-AD80-F2E4A7488069"),
                Id = "client1",
                Name = "Client 1 updated",
                Flow = "flow1"
            };

            var clients = new List<DataModel.Data.Client>
            {
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("D259986D-C8C5-4505-AD80-F2E4A7488069"),
                    Id = "client1",
                    Name = "Client 1",
                    Flow = "flow1"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("E7EC0E4F-44B5-4530-9B10-64BB617C0E78"),
                    Id = "client2",
                    Name = "Client 2",
                    Flow = "flow2"
                },
                new DataModel.Data.Client
                {
                    UID = Guid.Parse("6FCDB137-FAAB-49D1-84EE-942B9571E91A"),
                    Id = "client3",
                    Name = "Client 3",
                    Flow = "flow3"
                }
            };

            var clientsMock = clients.MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Clients).Returns(clientsMock.Object);

            var facade = new ClientFacade(context.Object, _systemTime);
            facade.AddOrUpdateClient(clientToUpdate);
            
            // Because it's not possible to check if dbContext was updated, it'll be checked if SaveChanges()-method is called exactly once
            context.Verify(exp => exp.SaveChanges(), Times.Once);
            clientsMock.Verify(exp => exp.Add(It.Is<DataModel.Data.Client>(c => c.UID == clientToUpdate.UID)), Times.Never);
        }
    }
}
