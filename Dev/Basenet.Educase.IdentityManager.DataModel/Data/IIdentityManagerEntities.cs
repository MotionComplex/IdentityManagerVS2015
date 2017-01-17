using System.Data.Entity;

namespace Basenet.Educase.IdentityManager.DataModel.Data
{
    public interface IIdentityManagerEntities
    {
        IDbSet<Account> Accounts { get; set; }

        IDbSet<Claim> Claims { get; set; }

        IDbSet<Client> Clients { get; set; }

        IDbSet<ClientToMandator> ClientToMandators { get; set; }

        IDbSet<ClientToScope> ClientToScopes { get; set; }

        IDbSet<Mandator> Mandators { get; set; }

        IDbSet<Scope> Scopes { get; set; }

        IDbSet<ScopeToClaim> ScopeToClaims { get; set; }

        int SaveChanges();
    }
}
