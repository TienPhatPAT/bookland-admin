/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { validateImage } from "@/utils/functions";
import { Control, useController } from "react-hook-form";
import { toast } from "react-toastify";

import { FormControl, FormHelperText, FormLabel, Typography } from "@mui/material";

import { MediaApi } from "@/services/media.api";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  required?: boolean;
}

const parseXmlToJson = (xml: string) => {
  const json: any = {};
  for (const res of xml.matchAll(
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
  )) {
    const key = res[1] || res[3];
    const value = res[2] && parseXmlToJson(res[2]);
    json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
  }
  return json;
};

const urlFromXML = (xml: string) => {
  return parseXmlToJson(xml)?.PostResponse?.Location;
};

interface IMediaRes {
  url: string;
  type: string;
  signed_url?: {
    url: string;
    fields: {
      acl: string;
      success_action_status: string;
      bucket: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      Policy: string;
      "X-Amz-Signature": string;
      key: string;
    };
  };
  fields: {
    url: string;
    fields: {
      acl: string;
      success_action_status: string;
      bucket: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      Policy: string;
      "X-Amz-Signature": string;
      key: string;
    };
  };
}

function ImageField({ name, control, label, required }: Props) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (targetEvent: EventTarget & HTMLInputElement) => {
    if (!targetEvent.files) return;

    const listFile: File[] = Array.from(targetEvent.files);
    targetEvent.value = "";
    // check type, file size.
    const isCheck = validateImage(listFile);
    if (isCheck) {
      const dataMapping = { type: "images" };
      setLoading(true);
      const resS3: any = await MediaApi.createSigned(dataMapping);
      if (!resS3) {
        return toast.error("Something went wrong!");
      }
      const resUrl = await uploadS3(resS3.data.data, listFile[0]);
      onChange?.(resUrl);
      setLoading(false);
    }
  };

  const uploadS3 = async (data: IMediaRes, file: File) => {
    const body = new FormData();
    // eslint-disable-next-line array-callback-return
    Object.entries(data.fields).map(([key, value]) => {
      if (typeof value === "string") {
        body.append(key, value);
      }
    });
    body.append("file", file);

    const xml = await MediaApi.s3tracking(data.url, body);

    if (!xml) {
      return Promise.reject(null);
    }

    return urlFromXML(xml);
  };

  return (
    <FormControl>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <input
        style={{ marginBottom: "10px" }}
        id={name}
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e.target)}
        ref={ref}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
      {loading && <Typography>Loading...</Typography>}
      {value && !loading && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open(value, "_blank");
          }}
        >
          <img src={value} alt="" width="300px" />
        </div>
      )}
    </FormControl>
  );
}

export default ImageField;
