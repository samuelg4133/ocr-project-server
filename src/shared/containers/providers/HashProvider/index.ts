import { container } from "tsyringe";

import BcryptHashProvider from "./implementations/BcryptHashProvider";
import IHashProvider from "./models/IHashProvider";

const providers = {
  bcrypt: BcryptHashProvider,
};

container.registerSingleton<IHashProvider>("HashProvider", providers.bcrypt);
