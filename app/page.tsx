"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./homepage.module.scss";
import common from "./common.module.scss";
import { motion } from "framer-motion";

const Page = () => {
  return <div className={common.pageContainer}></div>;
};

export default Page;
