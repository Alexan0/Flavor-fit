import toast from "react-hot-toast";
import { Heart, Share, ShoppingCart } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export function RecipeContentActions() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied successfully");
  };

  return (
    <div className="flex items-center">
      <Button variant="soft" size="icon" className="w-8" onClick={handleCopyLink}>
        <Share color="#000" />
      </Button>
      <Button variant="soft" size="icon" className="w-8">
        <ShoppingCart color="#000" />
      </Button>
      <Button variant="soft" size="icon" className="w-8">
        <Heart color="#000" />
      </Button>
    </div>
  );
}
