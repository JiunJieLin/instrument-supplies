import AddButton from "../AddButton/AddButton";
import { useContext } from "react";
import { ProductContext } from "@/data/context";
import { useCartActions } from "../hooks/useCartActions";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Item = ({ data }) => {
  const { cart, setCart } = useContext(ProductContext);
  const { handleOnAdd, handleOnRemove } = useCartActions(cart, setCart);

  const [clicked, setClicked] = useState(false);
  const handleHeartClick = () => {
    setClicked(!clicked);
  };

  const existingCartItem = cart.find((item) => item.id === data.id);
  const itemCount = existingCartItem ? existingCartItem.count : 0;

  return (
    <div className="mb-1 p-4 hover:shadow-xl">
      <div className="aspect-video overflow-hidden flex items-center relative">
        <img src={data.image} alt="" />
        <AddButton
          onAdd={(e) => handleOnAdd(data, e)}
          onRemove={(e) => handleOnRemove(data, e)}
          itemCount={itemCount}
        />
      </div>
      <div className="py-2 text-stone-950 relative">
        <div>{data.title}</div>
        <div className="flex relative">
          <div className="text-sm opacity-70">${data.price}</div>
          <button onClick={handleHeartClick} className="absolute top-0 right-3">
            {clicked ? (
              <HeartFilledIcon className="text-red-500" />
            ) : (
              <HeartIcon className="text-red-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Item;
