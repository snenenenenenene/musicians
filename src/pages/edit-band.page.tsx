import React, { useContext, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useMutation, useQueries } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { Title, TitleWithGoBack } from '../constants/Layout';
import { Band, User } from '../constants/types';
import { getBandById, getMusicians, patchBand } from '../services/api-calls';
import { GlobalContext } from '../services/store';

export const EditBand = () => {
  const { user } = useContext(GlobalContext);
  const params = useParams();
  const bandId = Number(params.id);
  const [users, setUsers] = useState<{ label: string; value: number }[]>([]);
  const [value, setValue] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const results = useQueries([
    {
      queryKey: ['bands'],
      queryFn: () => getBandById(bandId),
      onSuccess(data) {
        setBand(data);
      },
    },
    {
      queryKey: ['users'],
      queryFn: () => getMusicians(),
      onSuccess(data) {
        // set users equal to data but remove user from list that's equal to current user id
        setUsers(
          data
            .filter((u: User) => u.id !== user.id)
            .map((u: User) => ({
              label: u.name,
              value: u.id,
            }))
        );

        //set value equal to all users that are in the band
        setValue(
          data
            .filter((u: User) => band.members.includes(u.id!) && u.id !== user.id)
            .map((u: User) => ({
              label: u.name,
              value: u.id,
            }))
        );
      },
    },
  ]);

  const navigate = useNavigate();

  const [band, setBand] = useState<Band>({
    name: '',
    location: '',
    fans: 0,
    groupies: 0,
    members: [user.id],
    picture: undefined,
  });

  const patchMutation = useMutation((band: Band) => patchBand(band));

  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    patchMutation.mutate(band);
    navigate(-1);
  };

  const onChange = (selectedOptions) => {
    setValue(selectedOptions);
    setBand({
      ...band,
      members: [user.id, ...selectedOptions.flatMap((option) => option.value)],
    });
  };

  return (
    <Container>
      <TitleWithGoBack title="Edit Band" />
      <Title title="Band Picture" type="small" />
      <Dropzone
        data-cy="band-file-dropzone"
        onDrop={(acceptedFiles) => {
          console.log(acceptedFiles);
          setBand({
            ...band,
            picture: URL.createObjectURL(acceptedFiles[0]),
          });
        }}>
        {({ getRootProps, getInputProps }) => (
          <section className="flex flex-col h-40 mb-4 border-2 border-main-text rounded-xl border-dashed justify-center items-center bg-main-1 hover:bg-main-2 text-main-text outline-none">
            <div {...getRootProps()} className="relative flex w-full h-full">
              <input {...getInputProps()} />
              <p className="m-auto">Drag 'n' drop your band profile picture here!</p>{' '}
              {band.picture && (
                <img
                  alt={band.name}
                  className="absolute w-full bg-main-dark-1 object-contain h-full"
                  src={band?.picture}
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <Title title="Name" type="small" />
      <Input
        name="Band name"
        value={band?.name}
        onChange={(e: any) => setBand({ ...band, name: e.target.value })}
        placeholder="Band name"
      />
      <Title title="Members" type="small" />

      <Select value={value} isMulti options={users} onChange={onChange} />
      <Button
        onClick={(e) => handleSubmit(e)}
        name="submit-edited-band"
        className="flex w-full justify-center items-center h-20 mt-auto">
        Edit Band
      </Button>
    </Container>
  );
};
