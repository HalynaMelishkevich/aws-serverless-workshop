#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessWorkshopStack } from '../lib/serverless-workshop-stack';

const app = new cdk.App();
new ServerlessWorkshopStack(app, 'ServerlessWorkshopStack');
