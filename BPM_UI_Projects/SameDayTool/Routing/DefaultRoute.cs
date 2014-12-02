// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRoute.cs" company="AT&T">
//   Copyright © 2014 AT&T
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.SameDayTool.Routing
{
    using System.Web.Routing;

    public class DefaultRoute : Route
    {
        public DefaultRoute()
            : base("{*path}", new DefaultRouteHandler())
        {
            this.RouteExistingFiles = false;
        }
    }
}
