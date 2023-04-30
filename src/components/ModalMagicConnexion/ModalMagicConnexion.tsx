import { Dialog, Transition } from "@headlessui/react";
import { WalletContext } from "../../context/Wallet.context";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { ReactComponent as Cross } from "../../asset/icons/Cross.svg";
import { m } from "../../plugins/magic";
import { ethers } from "ethers";
import { MagicSDKExtensionsOption } from "magic-sdk";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";

type ModalMagicConnexionProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const ModalMagicConnexion: FC<ModalMagicConnexionProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [email, setEmail] = useState<string>("");
  const [meterID, setMeterID] = useState<string>("");
  const { initMagicWallet, setSigner } = useContext(WalletContext);

  function closeModal() {
    setIsOpen(false);
  }

  const magicConnected = async (
    m: InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
  ) => {
    const isLoggedIn = await m.user.isLoggedIn();
    if (isLoggedIn) {
      const metadata = await m.user.getMetadata();
      initMagicWallet(
        metadata.email || "",
        metadata.publicAddress || "",
        meterID
      );
      const provider = new ethers.providers.Web3Provider(m.rpcProvider as any);
      const signer = provider.getSigner();
      setSigner(signer);
      closeModal();
    }
  };

  useEffect(() => {
    magicConnected(m as any);
  }, []);

  const authenticationMagic = async () => {
    await m.auth
      .loginWithEmailOTP({ email })
      .then(async () => {
        const metadata = await m.user.getMetadata();
        initMagicWallet(
          metadata.email || "",
          metadata.publicAddress || "",
          meterID
        );
        const provider = new ethers.providers.Web3Provider(
          m.rpcProvider as any
        );
        const signer = provider.getSigner();
        setSigner(signer);
        closeModal();
      })
      .catch((error: Error) => {
        throw new Error("MAGIC_AUTH_ERROR: " + error.message);
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="bg-gray800 fixed inset-0 overflow-y-auto bg-opacity-30">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="card max-h-[536px] w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="border-borderCardAbout flex flex-row items-center justify-between border-b-[0.5px] border-solid p-6  text-lg font-medium leading-6 text-gray-900"
                  >
                    <div>
                      Connection with
                      <span className=" text-magicWallet"> Magic Wallet</span>
                    </div>
                    <Cross
                      className=" hover:cursor-pointer"
                      onClick={() => {
                        closeModal();
                      }}
                    />
                  </Dialog.Title>
                  <div className="flex flex-col  gap-2   p-5">
                    <div>Recipient email</div>
                    <input
                      placeholder="Enter an email..."
                      type="text"
                      className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033] p-[10px]"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <div>Meter ID</div>
                    <input
                      placeholder="Enter your meterID..."
                      type="text"
                      className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033] p-[10px]"
                      onChange={(e) => {
                        setMeterID(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center pb-5">
                    <button
                      onClick={() => {
                        authenticationMagic();
                      }}
                      className="flex h-[48px]  items-center justify-center rounded-lg  bg-magicWallet px-6 py-3 text-base font-normal text-white hover:cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalMagicConnexion;
