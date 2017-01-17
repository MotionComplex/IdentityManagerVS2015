using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager.DataModel.Data;
using Basenet.Educase.IdentityManager.Facade.Scope;
using Moq;
using NUnit.Framework;

namespace Basenet.Educase.IdentityManager.Facade.UnitTest
{
    [TestFixture]
    public class ScopeFacadeTest
    {
        private readonly ISystemTime _systemTime = new SystemTime();

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_ScopeFacade_GetScopes()
        {
            var scopeDbMockSet = new List<DataModel.Data.Scope>
            {
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("62AECAFF-B05D-4D42-98B8-6284033728B4")
                },
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("2CEA986B-991B-4D0E-BEE2-A8D994810191")
                }
            }.MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Scopes).Returns(scopeDbMockSet.Object);

            var facade = new ScopeFacade(context.Object, _systemTime);
            var scopes = facade.GetScopes().ToList();

            Assert.That(scopes.Any(s => s.UID == Guid.Parse("62AECAFF-B05D-4D42-98B8-6284033728B4")));
            Assert.That(scopes.Any(s => s.UID == Guid.Parse("2CEA986B-991B-4D0E-BEE2-A8D994810191")));
        }

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_ScopeFacade_AddOrUpdateScope_Add()
        {
            var scopeDbMockSet = new List<DataModel.Data.Scope>
            {
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("62AECAFF-B05D-4D42-98B8-6284033728B4")
                },
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("2CEA986B-991B-4D0E-BEE2-A8D994810191")
                }
            }.MockDbSet();

            var scopeToAdd = new Models.Scope
            {
                UID = Guid.Parse("388FABE8-FD40-4386-B98D-A2A949295BB0")
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Scopes).Returns(scopeDbMockSet.Object);

            var facade = new ScopeFacade(context.Object, _systemTime);
            facade.AddOrUpdateScope(scopeToAdd);

            scopeDbMockSet.Verify(exp => exp.Add(It.Is<DataModel.Data.Scope>(s => s.UID == scopeToAdd.UID)), Times.Once);
            context.Verify(exp => exp.SaveChanges(), Times.Once);
        }


        [Test]
        public void Basenet_Educase_IdentityManager_Facade_ScopeFacade_AddOrUpdateScope_Update()
        {
            var scopeDbMockSet = new List<DataModel.Data.Scope>
            {
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("62AECAFF-B05D-4D42-98B8-6284033728B4")
                },
                new DataModel.Data.Scope
                {
                    UID = Guid.Parse("2CEA986B-991B-4D0E-BEE2-A8D994810191")
                }
            }.MockDbSet();

            var scopeToAdd = new Models.Scope
            {
                UID = Guid.Parse("62AECAFF-B05D-4D42-98B8-6284033728B4")
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Scopes).Returns(scopeDbMockSet.Object);

            var facade = new ScopeFacade(context.Object, _systemTime);
            facade.AddOrUpdateScope(scopeToAdd);

            context.Verify(exp => exp.SaveChanges(), Times.Once);
            scopeDbMockSet.Verify(exp => exp.Add(It.Is<DataModel.Data.Scope>(s => s.UID == scopeToAdd.UID)), Times.Never);
        }
    }
}
