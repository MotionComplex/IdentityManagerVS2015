using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager.DataModel.Data;
using Basenet.Educase.IdentityManager.Facade.Claim;
using Moq;
using NUnit.Framework;

namespace Basenet.Educase.IdentityManager.Facade.UnitTest
{
    [TestFixture]
    public class ClaimFacadeTests
    {
        private readonly ISystemTime _systemTime = new SystemTime();

        [Test]
        public void Basenet_Educase_IdentityManager_Facade_ClaimFacade_GetClaims()
        {
            var claimsMock =
                new List<DataModel.Data.Claim>
                {
                    new DataModel.Data.Claim
                    {
                        UID = Guid.Parse("0FEC295D-9A9C-4F83-AD9D-330C8186AE2B"),
                        Name = "Username",
                        Description = "Username Claim",
                        AlwaysIncludeInIdToken = true
                    },
                    new DataModel.Data.Claim
                    {
                        UID = Guid.Parse("B03E8FF0-11FF-486B-8CA0-CFD430E56786"),
                        Name = "Name",
                        Description = "Name Claim",
                        AlwaysIncludeInIdToken = false
                    }
                };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Claims).Returns(claimsMock.MockDbSet().Object);

            var facade = new ClaimFacade(context.Object, _systemTime);
            var claims = facade.GetClaims();

            Assert.AreEqual(2, claims.Count);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_ClaimFacade_GetAssignedClaims()
        {
            var scopeUid = Guid.Parse("E6601356-CFB7-4904-BB76-4369602DEC9D");
            var claimsMock = new List<DataModel.Data.Claim>
            {
                new DataModel.Data.Claim
                {
                    UID = Guid.Parse("BF0099E5-8EAA-470E-BE1D-F32BBAF04793"),
                    Name = "Username",
                    Description = "Username Claim",
                    AlwaysIncludeInIdToken = true
                },
                new DataModel.Data.Claim
                {
                    UID = Guid.Parse("F70EC160-C025-49E2-9133-5BA5E1BB143E"),
                    Name = "Name",
                    Description = "Name Claim",
                    AlwaysIncludeInIdToken = true
                },
                new DataModel.Data.Claim
                {
                    UID = Guid.Parse("EBE27EDE-455D-4779-9A55-FB464C7CD9FF"),
                    Name = "Username",
                    Description = "Firstname Claim",
                    AlwaysIncludeInIdToken = true
                }
            };
            var scopeToClaimsMock =
                new List<ScopeToClaim>
                {
                    new ScopeToClaim
                    {
                        UID = Guid.Parse("59F8DDEC-FAD9-4EA3-84CC-C4D04A23017E"),
                        ScopeUID = Guid.Parse("E6601356-CFB7-4904-BB76-4369602DEC9D"),
                        ClaimUID = Guid.Parse("BF0099E5-8EAA-470E-BE1D-F32BBAF04793")
                    },
                    new ScopeToClaim
                    {
                        UID = Guid.Parse("04317BCD-A3A0-48FF-A9F7-23080B3B76BA"),
                        ScopeUID = Guid.Parse("E6601356-CFB7-4904-BB76-4369602DEC9D"),
                        ClaimUID = Guid.Parse("F70EC160-C025-49E2-9133-5BA5E1BB143E")
                    },
                    new ScopeToClaim
                    {
                        UID = Guid.Parse("9D9FBD1B-1252-4618-BB5C-228721D2E922"),
                        ScopeUID = Guid.Parse("E6601356-CFB7-4904-BB76-4369602DEC9D"),
                        ClaimUID = Guid.Parse("EBE27EDE-455D-4779-9A55-FB464C7CD9FF")
                    },
                };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Claims).Returns(claimsMock.MockDbSet().Object);
            context.Setup(exp => exp.ScopeToClaims).Returns(scopeToClaimsMock.MockDbSet().Object);

            var facade = new ClaimFacade(context.Object, _systemTime);
            var assignedClaims = facade.GetAssignedClaims(scopeUid);

            Assert.AreEqual(3, assignedClaims.Count);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_ClaimFacade_UpdateScopeToClaims_Add()
        {
            var scopeUid = Guid.Parse("E6601356-CFB7-4904-BB76-4369602DEC9D");

            var claimsMock = new List<DataModel.Data.Claim>
            {
                new DataModel.Data.Claim
                {
                    UID = Guid.Parse("BF0099E5-8EAA-470E-BE1D-F32BBAF04793"),
                    Name = "Username",
                    Description = "Username Claim",
                    AlwaysIncludeInIdToken = true
                }
            }.MockDbSet();

            var claims = new List<Models.Claim>
            {
                new Models.Claim
                {
                    UID = Guid.Parse("BF0099E5-8EAA-470E-BE1D-F32BBAF04793"),
                    Name = "Username",
                    Description = "Username Claim",
                    AlwaysIncludeInIdToken = true
                }
            };

            var scopeToClaims =
                new List<ScopeToClaim>
                {
                    new ScopeToClaim
                    {
                        UID = Guid.Parse("59F8DDEC-FAD9-4EA3-84CC-C4D04A23017E"),
                        ScopeUID = scopeUid,
                        ClaimUID = Guid.Parse("BF0099E5-8EAA-470E-BE1D-F32BBAF04793")
                    }
                };

            var scopeToClaimsMock = scopeToClaims.MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Claims).Returns(claimsMock.Object);
            context.Setup(exp => exp.ScopeToClaims).Returns(scopeToClaimsMock.Object);
            
            var facade = new ClaimFacade(context.Object, _systemTime);
            facade.UpdateScopeToClaims(scopeUid, claims);

            // Checks if Add-method has been called exaclty one time
            scopeToClaimsMock.Verify(exp => exp.Add(It.Is<ScopeToClaim>(c => c.ScopeUID == scopeUid)), Times.Once);
            context.Verify(exp => exp.SaveChanges(), Times.Once);
        }
    }
}
