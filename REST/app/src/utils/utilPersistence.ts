type PersistenceData = {[id in IdPersistence]: any};

export const enum PersistenceMode {
    Update = 'Update',
    Write = 'Write',
}
export const enum IdPersistence {
    auth = 'auth',
}

const persistenceStorageKey = "docketyinc";
export interface IUtilPersistenceAuth {
    token: string;
    issuedAt?: number;
    rememberMe: boolean;
    _id?: string;
}
const initialAuth: IUtilPersistenceAuth = {
    token: "",
    rememberMe: false,
}
const initialPersistence: PersistenceData = {
    auth: initialAuth,
};

class UtilPersistence {
    private readonly data: PersistenceData;
    constructor () {
        this.data = this.getDataFromStorage(initialPersistence);
    }

    public getValue = <TData>(id: IdPersistence, defaultValue?: TData): TData => {
        return this.data[id] || defaultValue;
    };
    public setValue = <TData extends {}>(
        id: IdPersistence,
        data: TData,
        mode: PersistenceMode = PersistenceMode.Update,
    ) => {
        switch (mode) {
            case PersistenceMode.Write:
                this.data[id] = data;
                break;
            case PersistenceMode.Update:
                this.data[id] = {...this.data[id], ...(data as any)};
                break;
        }

        this.setDataToStorage(this.data);
    };


    private getDataFromStorage = <TData extends {}>(defaultStorageData: TData): TData => {
        const value = this.deserialize(localStorage.getItem(persistenceStorageKey)) || defaultStorageData;

        return value as TData;
    }

    private setDataToStorage = (data: PersistenceData) => {
        const serializedData = this.serialize(data);
        if (serializedData) {
            localStorage.setItem(persistenceStorageKey, serializedData);
        }
    };

    private serialize = <TData extends {}>(data: TData | undefined) => {
        if (!data) {
            return undefined;
        }
        try {
            return JSON.stringify(data);
        } catch {
            return undefined;
        }
    };

    private deserialize = <TData extends {}> (serializedData: string | null): TData | undefined => {
        if (!serializedData) {
            return undefined;
        }

        try {
            return JSON.parse(serializedData) as TData;
        } catch {
            return undefined;
        }
    }
}

export const utilPersistence = new UtilPersistence();