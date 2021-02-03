import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { IConnectedHeader } from "./Header.types";
import Header from "./Header";

const ConnectedHeader: React.FC<IConnectedHeader> = (props) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  /**
   * Hooks para sincronizar input value
   */
  useEffect(() => {
    const { search } = router.query;
    if (search && search !== value) {
      setValue(search as string);
    }
  }, [router.query]);

  function navigate(url: string) {
    /**
     * shallow routing me permite modificar la url
     * sin correr metodos data fetching de nuevo
     * https://nextjs.org/docs/routing/shallow-routing
     */
    router.push(url, undefined, { shallow: true });
  }

  return (
    <Header
      navigate={navigate}
      clearStore={props.clearStore}
      categories={props.categories}
      value={value}
      setValue={setValue}
    />
  );
};

export default observer(ConnectedHeader);
