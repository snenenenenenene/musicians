import { useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import ReactPlayer from 'react-player';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { Title, TitleWithGoBack } from '../constants/Layout';
import { Product } from '../constants/types';
import { postProduct } from '../services/api-calls';
import { GlobalContext } from '../services/store';

export const NewProduct = () => {
  const { band, setCurrentSong } = useContext(GlobalContext);
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    band: band,
    bandId: band.id,
    picture: '',
    audio: undefined,
    fileType: '',
  });
  const queryClient = useQueryClient();
  const mutation = useMutation((product: Product) => postProduct(product, band.id), {
    onSuccess: () => {
      toast('Created new product!', { type: 'success' });
      queryClient.invalidateQueries('products');
    },
    onError: () => {
      toast('Something went wrong!', { type: 'error' });
    },
  });
  const navigate = useNavigate();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    mutation.mutate(product);
    navigate(-1);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-1);
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <Container>
      <TitleWithGoBack title="New Product" />
      <div className="w-full flex justify-between mt-7">
        <section>
          <Title title="Picture" type="small" />
          <Dropzone
            data-cy={'product-file-dropzone'}
            onDrop={(acceptedFiles) => {
              setProduct({
                ...product,
                picture: URL.createObjectURL(acceptedFiles[0]),
              });
            }}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex flex-col h-40 mb-4 border-2 border-main-text rounded-xl border-dashed justify-center items-center bg-main-1 hover:bg-main-2 text-main-text outline-none">
                <div {...getRootProps()} className="relative flex w-full h-full">
                  <input {...getInputProps()} />
                  <p className="m-auto mx-4">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                  {product.picture && (
                    <img
                      className="absolute w-full bg-main-dark-1 object-contain h-full"
                      src={product.picture}
                    />
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </section>
        <section>
          <Title title="Product file" type="small" />
          <Dropzone
            data-cy={'product-file-dropzone'}
            onDrop={(acceptedFiles) => {
              setProduct({
                ...product,
                audio: URL.createObjectURL(acceptedFiles[0]),
                fileType: acceptedFiles[0].type,
              });
            }}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex flex-col h-40 mb-4 border-2 border-main-text rounded-xl border-dashed justify-center items-center bg-main-1 hover:bg-main-2 text-main-text outline-none">
                <div {...getRootProps()} className="w-full h-full flex relative">
                  <input {...getInputProps()} />
                  <p className="m-auto mx-4">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                  {product.audio && (
                    <ReactPlayer
                      height={'full'}
                      width={'full'}
                      volume={40}
                      playing
                      controls={false}
                      onStart={() => {
                        setCurrentSong(undefined);
                      }}
                      className="absolute w-full bg-main-dark-1 object-contain h-full"
                      style={{ position: 'absolute' }}
                      url={product.audio}
                    />
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </section>
      </div>
      <Title title="Product Title" type="small" />
      <Input
        name="Product title"
        onChange={(e) => {
          setProduct({ ...product, name: e.target.value, price: product.price });
        }}
        placeholder="Sound title"
      />
      <Title title="Price" type="small" />
      <Input
        name="Price"
        type="number"
        onChange={(e) => {
          setProduct({ ...product, name: product.name, price: e.target.value });
        }}
        placeholder="Price"
      />
      <Title title="Description" type="small" />
      <Input
        name="Description"
        placeholder="Description"
        onChange={(e) => {
          setProduct({ ...product, description: e.target.value });
        }}
      />

      <Button
        name="submit-product"
        className="w-full mt-auto h-20"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Post
      </Button>
    </Container>
  );
};
