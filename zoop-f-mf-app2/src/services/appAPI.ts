import { Configuration, CounterApi } from '@com.zooplus/ms-app-sdk';
import axios from 'axios';

const domain = process.env.MS_APP_DOMAIN;
const port = process.env.MS_APP_PORT;

/**
 *
 * Configuration used when querying MS APP APIs, it uses global Axios instance.
 *
 * @remarks
 * This configuration is part of the MS APP API
 *
 */
const baseConfiguration = new Configuration({ basePath: `http://${domain}:${port}/v1` });

/**
 *
 * Class to access MS APP related APIs
 *
 * @remarks
 * This configuration is part of the MS APP API
 *
 */
const counterAPI = new CounterApi(baseConfiguration, undefined, axios);

/**
 *
 * Increment counter
 *
 * @remarks
 * This method is part of the MS APP API
 *
 */
export async function incrementCounter() {
  const { data } = await counterAPI.incrementCounter();

  return data;
}

/**
 *
 * Fetch counter value
 *
 * @remarks
 * This method is part of the MS APP API
 *
 */
export async function getCounter() {
  const { data } = await counterAPI.getCounter();

  return data;
}
