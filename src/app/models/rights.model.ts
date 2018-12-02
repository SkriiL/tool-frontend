export class Right {
  id: number;
  name: string;
  canChat: boolean;
  canModifyOthers: boolean;
  canDelete: boolean;
  canModifyRights: boolean;
  canBeModified: boolean;
}

export const RIGHTS: Right[] = [
  {id: 3, name: 'Gründer', canChat: true, canModifyOthers: true, canDelete: true, canModifyRights: true, canBeModified: false},
  {id: 2, name: 'Admin', canChat: true, canModifyOthers: true, canDelete: true, canModifyRights: true, canBeModified: true},
  {id: 1, name: 'Member', canChat: true, canModifyOthers: false, canDelete: false, canModifyRights: false, canBeModified: true},
  {id: 0, name: 'Gast', canChat: false, canModifyOthers: false, canDelete: false, canModifyRights: false, canBeModified: true},
];
