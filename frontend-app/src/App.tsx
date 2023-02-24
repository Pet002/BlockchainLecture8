import { useState, useEffect } from "react";
import Web3 from "web3";
import { abi } from "./abiContract.abi";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Box, Button, Paper, Stack, styled } from "@mui/material";
import Tanjiro from "./image/Tanjiro-Kamado.jpg";
import Muzan from "./image/Muzan-Kibutsuji.jpg";
import Nezuko from "./image/Nezuko-Kamado.jpg";
import Inosuke from "./image/Inosuke-Hashibira.jpg";
import Zenitsu from "./image/Zenitsu-Agatsuma.jpg";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface getError {
  code: number;
  message: string;
}

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<any>(null);

  const [eventName, setEventName] = useState<string>("");
  const [eventArgs, setEventArgs] = useState<any>(null);

  const [table, setTable] = useState<any[]>([]);

  useEffect(() => {
    const { ethereum } = window;

    async function connectToWeb3() {
      if (ethereum) {
        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);
        try {
          await ethereum.request({ method: "eth_requestAccounts" });
          // Load Account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Load Contract
          const contractInstance = new web3Instance.eth.Contract(
            abi,
            "0xba2143AB82d0B0e2D03b4Cd6B3dDa6Fb9Df6A594"
          );
          setContract(contractInstance);
        } catch (error: any) {
          if (error.code === 4001) {
            console.error("please Connect MetaMask");
          } else {
            console.error(error);
          }
        }
      }
    }

    async function listTable() {
      if (contract) {
        contract.methods.getOwnerCharacter().call((err: any, result: any) => {
          setTable(result);
        });
      }
    }

    connectToWeb3();
    listTable();
  }, []);

  function listTable() {
    if (contract) {
      contract.methods.getOwnerCharacter().call((err: any, result: any) => {
        console.table(result);
      });
    }
  }
  async function submit(nameOfCharacter: string, price: string) {
    if (contract) {
      // will add name account and Date Time in function
      contract.methods
        .purchase(
          nameOfCharacter,
          account,
          new Date().toLocaleTimeString("en-US")
        )
        .send({ from: account, value: web3?.utils.toWei(price, "ether") }); // in payable will use send method to send eth to smart contract....

      // Liste for the NameAdded event
      contract.once("NameAdded", {}, function (error: any, event: any) {
        if (!error) {
          console.log(event);
          setEventName(event.event);
          setEventArgs(event.returnValues);
        } else {
          console.log(error);
        }
      });

      // Listen purchase Error Event
      contract.once("purchaseError", {}, function (error: any, event: any) {
        if (!error) {
          setEventName(event.event);
          setEventArgs(event.returnValues);
        }
      });
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <section className=" flex justify-center p-10 bg-white">
        <div className="flex-col justify-center bg-white-100">
          <div className="flex-row my-auto text-center">
            <h1 className="text-6xl text-black">Get Your Character</h1>
          </div>
          <div className="flex-row my-auto text-center">
            <h2 className="text-gray-700">A Character wait you get it</h2>
          </div>
          <div className="flex-row my-auto text-center">
            <p className="text-gray-700">
              This website run by web3.js version{" "}
              {web3 !== null ? web3.version : "Not found web3.js"} and react app{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
            <div>
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img src={Tanjiro} alt="Tanjiro" />
                {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-700">Tanjiro Kamado</h2>
                <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-blue-500">0.003 ETH</p>

                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <AttachMoneyIcon />

                    <button
                      className="text-sm"
                      onClick={() => {
                        submit("Tanjiro Kamado", "0.003");
                      }}
                    >
                      Get This
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
            <a href="#">
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img src={Zenitsu} alt="Zenitsu" />
                {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">4.9</span>
          </div> */}
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-700">Zenitsu Agatsuma</h2>
                <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-blue-500">0.002 ETH</p>

                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <AttachMoneyIcon />

                    <button
                      className="text-sm"
                      onClick={() => {
                        submit("Zenitsu Agatsuma", "0.002");
                      }}
                    >
                      Get This
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </article>

          <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
            <div>
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img
                  style={{ height: 266, width: 250 }}
                  src={Inosuke}
                  alt="Inosuke"
                />
                {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-700">Inosuke Hashibira</h2>
                <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-blue-500">0.002 ETH</p>
                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <AttachMoneyIcon />

                    <button
                      className="text-sm"
                      onClick={() => {
                        submit("Inosuke Hashibira", "0.002");
                      }}
                    >
                      Get This
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
            <div>
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img style={{ height: 264 }} src={Muzan} alt="Muzan" />
                {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">4.9</span>
          </div> */}
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-700">Muzan Kibutsuji</h2>
                <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-blue-500">0.01 ETH</p>

                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <AttachMoneyIcon />

                    <button
                      className="text-sm"
                      onClick={() => {
                        submit("Muzan Kibutsuji", "0.01");
                      }}
                    >
                      Get This
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
            <div>
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img src={Nezuko} alt="Nezuko" />
                {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">4.9</span>
          </div> */}
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-700">Nezuko Kamado</h2>
                <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-blue-500">0.005 ETH</p>

                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <AttachMoneyIcon />

                    <button
                      className="text-sm"
                      onClick={() => {
                        submit("Nezuko Kamado", "0.005");
                      }}
                    >
                      Get This
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className=" flex justify-center p-10 bg-white">
        <table className="table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Account</th>
              <th className="border border-slate-300">Character</th>
              <th className="border border-slate-300">Time</th>
            </tr>
          </thead>
          <tbody>
            {
              table.map((element : any) => (
                <tr>
                  <td>
                    {element[0]}
                  </td>
                  <td>
                    {element[1]}
                  </td>
                  <td>
                    {element[2]}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {web3 && <p>Web3.js version: {web3.version}</p>}
      {account && <p>Connected account: {account}</p>}
      {/* <button onClick={submit}>Test Button</button> */}
      <button onClick={listTable}>table</button>
      <p>Event name: {eventName}</p>
      <p>Event arguments: {JSON.stringify(table)}</p>
    </div>
  );
}

export default App;
