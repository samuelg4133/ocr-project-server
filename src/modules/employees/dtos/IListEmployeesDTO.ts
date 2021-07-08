export default interface IListEmployeesDTO {
  id: string;
  firstname: string;
  surname: string;
  date_of_birthday: Date;
  enabled: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}
