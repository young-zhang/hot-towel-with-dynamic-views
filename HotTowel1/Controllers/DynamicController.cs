using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HotTowel1.Controllers
{
    public class DynamicController : Controller
    {
        public ActionResult Shell()
        {
            return View();
        }

        public ActionResult Home()
        {
            return View();
        }

        public ActionResult Nav()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }

        public ActionResult Sessions()
        {
            return View();
        }

        public ActionResult Footer()
        {
            return View();
        }
    }
}