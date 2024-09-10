
export interface ISurvey extends Document{
    name: string;
    id_project: number;
    id_anonymous_participation: string;
    url: string;
    description: string;
    workgroup: string;
    id_workgroup: number;
    icon: string;
    fill_by_device: boolean;
    responses: {
        valid: number;
        noValid: number;
    };
    recopilationPeriod: {
        startedAt: number;
        endAt: number;
    };
    sphere: string;
    id: number;
    characterization: {
        provincia: string[];// [ "villa Clara", "cienfuegos"] | [""]
        municipio: string[];// ["Palmira","Abreus"] | [""]
        sex: string | null; // Masculino | Femenino | null
        age_group: string | null;  // `{int} a {int}` | mas de {int} | nullx
        educational_level: string | null; // ejemplo: "universitario" | ... | null,
    };
}

export interface IUser{
    provincia: string | null;
    municipio: string | null;
    sex: string | null ;
    age: number ;
    educational_level: string | null;
}