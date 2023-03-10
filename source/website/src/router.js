/*
######################################################################################################################
#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.                                                #
#                                                                                                                    #
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    #
#  with the License. A copy of the License is located at                                                             #
#                                                                                                                    #
#      http://www.apache.org/licenses/LICENSE-2.0                                                                    #
#                                                                                                                    #
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES #
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    #
#  and limitations under the License.                                                                                #
######################################################################################################################
*/

import Vue from "vue";
import VueRouter from "vue-router";
import Analysis from "@/views/Analysis.vue";
import Upload from "@/views/UploadToAWSS3.vue";
import Collection from "@/views/Collection.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/collection",
      name: "collection",
      component: Collection,
      meta: { requiresAuth: true },
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload,
      meta: { requiresAuth: true },
    },
    {
      path: "/analysis/:asset_id",
      name: "analysis",
      component: Analysis,
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next();
    } catch (e) {
      console.log(e);
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  console.log("hi", next);
  next();
});

export default router;
