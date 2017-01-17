using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager.DataModel.Data;
using Basenet.Educase.IdentityManager.Facade.Mandator;
using Moq;
using NUnit.Framework;

namespace Basenet.Educase.IdentityManager.Facade.UnitTest
{
    [TestFixture]
    public class MandatorFacadeTests
    {
        private readonly ISystemTime _systemTime = new SystemTime();

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_MandatorFacade_GetMandators()
        {
            var mandatorsMock = new List<DataModel.Data.Mandator>
            {
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F"),
                    Name = "mandator1",
                    Title = "Mandator 1"
                },
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("4A9CF6E9-E67E-461E-9C39-BB0B797D3D6B"),
                    Name = "mandator2",
                    Title = "Mandator 2"
                },
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF"),
                    Name = "mandator3",
                    Title = "Mandator 3"
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Mandators).Returns(mandatorsMock.MockDbSet().Object);

            var facade = new MandatorFacade(context.Object, _systemTime);
            var mandators = facade.GetMandators().ToList();

            Assert.That(mandators.Any(m => m.UID == Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F")));
            Assert.That(mandators.Any(m => m.UID == Guid.Parse("4A9CF6E9-E67E-461E-9C39-BB0B797D3D6B")));
            Assert.That(mandators.Any(m => m.UID == Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF")));
        }

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_MandatorFacade_GetAssignedMandators()
        {
            var mandatorsMock = new List<DataModel.Data.Mandator>
            {
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F"),
                    Name = "mandator1",
                    Title = "Mandator 1",
                    ClientToMandators = new List<ClientToMandator>
                    {
                        new ClientToMandator
                        {
                            UID = Guid.Parse("608BF77F-C297-48FF-ADA4-072E813AE818"),
                            MandatorUID = Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F"),
                            ClientUID = Guid.Parse("0430402C-7240-4DB7-A5AE-5F6B03138CAF")
                        }
                    }
                },
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("4A9CF6E9-E67E-461E-9C39-BB0B797D3D6B"),
                    Name = "mandator2",
                    Title = "Mandator 2",
                    ClientToMandators = new List<ClientToMandator>
                    {
                        new ClientToMandator
                        {
                            UID = Guid.Parse("0312FFF1-5EEA-4A07-B044-0E7DE5946FC2"),
                            MandatorUID = Guid.Parse("4A9CF6E9-E67E-461E-9C39-BB0B797D3D6B"),
                            ClientUID = Guid.Parse("0430402C-7240-4DB7-A5AE-5F6B03138CAF")
                        }
                    }
                },
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF"),
                    Name = "mandator3",
                    Title = "Mandator 3",
                    ClientToMandators = new List<ClientToMandator>
                    {
                        new ClientToMandator
                        {
                            UID = Guid.Parse("E6279361-38E4-4F0B-A775-FDC2DA92C321"),
                            MandatorUID = Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF"),
                            ClientUID = Guid.Parse("4340402C-7240-4887-54AE-5F6B03138454")
                        }
                    }
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Mandators).Returns(mandatorsMock.MockDbSet().Object);

            var facade = new MandatorFacade(context.Object, _systemTime);
            var assignedMandators = facade.GetAssignedMandators(Guid.Parse("0430402C-7240-4DB7-A5AE-5F6B03138CAF")).ToList();

            Assert.That(assignedMandators.Any(am => am.UID == Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F")));
            Assert.That(assignedMandators.Any(am => am.UID == Guid.Parse("4A9CF6E9-E67E-461E-9C39-BB0B797D3D6B")));
            Assert.That(assignedMandators.Any(am => am.UID == Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF")) == false);
        }

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_MandatorFacade_UpdateClientToMandators_Add()
        {
            var clientUid = Guid.Parse("608BF77F-C297-48FF-ADA4-072E813AE818");
            var clients = new List<DataModel.Data.Client>
            {
                new DataModel.Data.Client
                {
                    UID = clientUid
                }
            };

            var clientToMandatorsMock = new List<ClientToMandator>
            {
                new ClientToMandator
                {
                    UID = Guid.Parse("E6279361-38E4-4F0B-A775-FDC2DA92C321"),
                    MandatorUID = Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF"),
                    ClientUID = clientUid
                }
            }.MockDbSet();

            var mandatorsDbSetMock = new List<DataModel.Data.Mandator>
            {
                new DataModel.Data.Mandator
                {
                    UID = Guid.Parse("93D90C31-DB6D-4E2C-BCE5-77CD11D04BBF")
                }
            }.MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Clients).Returns(clients.MockDbSet().Object);
            context.Setup(exp => exp.Mandators).Returns(mandatorsDbSetMock.Object);
            context.Setup(exp => exp.ClientToMandators).Returns(clientToMandatorsMock.Object);

            var mandators = new List<Models.Mandator>
            {
                new Models.Mandator
                {
                    UID = Guid.Parse("603E740E-C4B2-4FF1-861C-97286800D73F")
                }
            }.AsEnumerable();

            var facade = new MandatorFacade(context.Object, _systemTime);
            facade.UpdateClientToMandators(clientUid, mandators);

            clientToMandatorsMock.Verify(o => o.Add(It.IsAny<ClientToMandator>()), Times.Once);
            context.Verify(c => c.SaveChanges(), Times.Once);
        }
    }
}
