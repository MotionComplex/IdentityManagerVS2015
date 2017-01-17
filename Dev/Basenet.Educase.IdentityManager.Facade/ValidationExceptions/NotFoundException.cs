using System;

namespace Basenet.Educase.IdentityManager.Facade.ValidationExceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}
