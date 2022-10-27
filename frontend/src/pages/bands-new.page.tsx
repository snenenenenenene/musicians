import React, { useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { Title, TitleWithGoBack } from '../constants/Layout';
import { Band, User } from '../constants/types';
import { getMusicians, postBand } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import Select from 'react-select';

export const NewBand = () => {
  const { user } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const [band, setBand] = useState<Band>({
    name: '',
    location: 'Belgium',
    fans: 0,
    groupies: 0,
    members: [user.id],
  });
  const [value, setValue] = useState<any>();

  const mutation = useMutation((band: Band) => postBand(band, user.id), {
    onSuccess: () => {
      toast('Band created successfully!', { type: 'success' });
      queryClient.invalidateQueries('userBands');
    },
  });

  // get all users with musician role

  const {
    data,
    error,
    status,
  }: { data?: User[]; error: { message: string } | null; status: string } = useQuery(
    'users',
    getMusicians
  );

  const onChange = (selectedOptions) => {
    setValue(selectedOptions);
    // add all members to the band including the current user
    const _members = selectedOptions.map((option) => option.value);
    _members.push(user.id);
    setBand({ ...band, members: _members });

    // setBand({
    //   ...band,
    //   members: [...selectedOptions.flatMap((option) => option.value)],
    // });
  };
  useEffect(() => {
    console.log(band);
  }, [band]);

  const navigate = useNavigate();

  const createBand = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    mutation.mutate(band);
    navigate(-1);
  };

  return (
    <Container>
      <TitleWithGoBack title="New Band" />
      <Title title="Band Picture" type="small" className="mt-7" />
      <Dropzone
        data-cy="band-file-dropzone"
        onDrop={(acceptedFiles) => {
          setBand({
            ...band,
            picture: URL.createObjectURL(acceptedFiles[0]),
          });
        }}>
        {({ getRootProps, getInputProps }) => (
          <section className="flex flex-col h-40 mb-4 border-2 border-main-text rounded-xl border-dashed justify-center items-center bg-main-1 hover:bg-main-2 text-main-text outline-none">
            <div {...getRootProps()} className="relative flex w-full h-full">
              <input {...getInputProps()} />
              <p className="m-auto mx-4">Drag 'n' drop your band profile picture here!</p>{' '}
              {band.picture && (
                <img
                  className="absolute w-full bg-main-dark-1 object-contain h-full"
                  src={band.picture}
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <Title title="Name" type="small" />
      <Input
        name="Band name"
        onChange={(e: any) => setBand({ ...band, name: e.target.value })}
        placeholder="Band name"
      />
      <Title title="Members" type="small" />

      <Select
        value={value}
        isMulti
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderRadius: '0',
            ':hover': {
              borderColor: '#fff',
            },
          }),
          placeholder: (provided, state) => ({
            ...provided,
            color: '#3A446A',
          }),
        }}
        className="text-main-dark-1 placeholder-main-text"
        options={data
          ?.filter((u: User) => u.id !== user.id)
          .map((u: User) => ({
            label: u.name!,
            value: u.id!,
          }))}
        onChange={onChange}
      />
      <Button
        onClick={(e) => createBand(e)}
        name="submit-edited-band"
        className="flex w-full justify-center items-center h-20 mt-auto">
        Add Band
      </Button>
    </Container>
  );
};
