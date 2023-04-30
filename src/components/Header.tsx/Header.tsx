import React, { useState } from "react";
import { ReactComponent as Logo } from "../../asset/logos/EnergyLogo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<0 | 1 | 2 | 3>(0);
  return (
    <div className="border-b-borderBottomConnectedCard grid h-16 grid-cols-3 border-b-[0.5px] px-6">
      <div
        className="col-span-1 flex items-center gap-2 hover:cursor-pointer"
        onClick={() => {
          navigate("/proposals");
        }}
      >
        <Logo className=" h-10  w-10" />
        <div className=" text-lg  font-bold ">EnergyDao</div>
      </div>

      <div className="flex items-center justify-center gap-[12px] space-x-2">
        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 0 && " border-b-[3px] border-b-green-400 "
          } `}
          onClick={() => {
            setSelectedPart(0);
            navigate("/proposals");
          }}
        >
          <div
            className={`font-semibold ${
              selectedPart === 0 && " text-green-400"
            }`}
          >
            Proposals
          </div>
        </div>

        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 1 && " border-b-[3px] border-b-green-400 "
          } `}
          onClick={() => {
            setSelectedPart(1);
            navigate("/submitProposal");
          }}
        >
          <div
            className={`font-semibold  ${
              selectedPart === 1 && " text-green-400"
            }`}
          >
            + submit
          </div>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-[8px] font-semibold  ">
        <button className="rounded-2xl bg-green-400 py-3 px-5 font-semibold text-white hover:bg-green-700">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
