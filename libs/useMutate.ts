import { useState } from "react";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";
type useMutateReturn<T> = [(data: any) => void, useMutateState<T>];
interface useMutateState<T> {
    loading: boolean;
    data?: T;
    error?: any;
}

interface Props {
    url: string;
    method: MethodType;
}

const useMutate = <T extends any>({
    url,
    method,
}: Props): useMutateReturn<T> => {
    const [states, setStates] = useState<useMutateState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
    });

    const mutate = async (data?: any) => {
        try {
            setStates((prev) => ({ ...prev, loading: true }));

            const res = await (
                await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
            ).json();

            setStates((prev) => ({
                ...prev,
                data: res,
            }));
        } catch (error) {
            setStates((prev) => ({ ...prev, error }));
        } finally {
            setStates((prev) => ({ ...prev, loading: false }));
        }
    };

    return [mutate, { ...states }];
};

export default useMutate;
