using System;

namespace Basenet.Educase.IdentityManager.Facade.ValidationExceptions
{
    public class UnprocessableEntityException : Exception
    {
        public UnprocessableEntityException(string message) : base(message)
        {
        }
    }
}
