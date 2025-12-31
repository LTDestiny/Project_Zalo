import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '@/types/group.types';

interface GroupState {
  groups: Group[];
  activeGroupId: string | null;
  loading: boolean;
}

const initialState: GroupState = {
  groups: [],
  activeGroupId: null,
  loading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    setActiveGroup: (state, action: PayloadAction<string | null>) => {
      state.activeGroupId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setGroups, addGroup, setActiveGroup, setLoading } = groupSlice.actions;
export default groupSlice.reducer;
