import Button, { SecondaryButton } from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import Flex, { TitleWithGoBack } from '../constants/Layout';
import React, { useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { GlobalContext } from '../services/store';

export default function EditProfile() {
  const { user } = useContext(GlobalContext);
  return (
    <Container>
      <TitleWithGoBack title="Profile" />
      <Flex className="items-center justify-start w-full">
        <div className="w-24 h-24 bg-main-2 shadow rounded-full mr-4 overflow-hidden">
          <img src={user?.picture} alt="" className="w-24 h-24 object-cover" />
        </div>
        <Button name="upload-profile-picture" className="h-10 mr-4" type="file">
          Upload Photo
        </Button>
        <SecondaryButton className="h-10">
          <IoMdTrash />
        </SecondaryButton>
      </Flex>
      <Input name="Display name" value={user?.name} placeholder="Display Name" />
      <Input name="Email" value={user?.email} placeholder="Email" />
      <Input name="Location" value={user?.location} placeholder="Location" />
      <Button name="save-edited-profile" className="w-3/4 my-4">
        Save
      </Button>
    </Container>
  );
}
