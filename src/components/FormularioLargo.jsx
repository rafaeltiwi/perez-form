import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define el esquema de validación
const formSchema = z.object({
  nombreCompleto: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  telefono: z
    .string()
    .min(10, { message: 'El teléfono debe tener al menos 10 dígitos.' }),
  direccion: z
    .string()
    .min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  ciudad: z
    .string()
    .min(2, { message: 'La ciudad debe tener al menos 2 caracteres.' }),
  codigoPostal: z
    .string()
    .min(5, { message: 'El código postal debe tener al menos 5 caracteres.' }),
  // Añade más campos según sea necesario
});

export default function FormularioLargo() {
  const [activeTab, setActiveTab] = useState('datosPersonales');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreCompleto: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      codigoPostal: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Formulario de Registro
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="datosPersonales">
                  Datos Personales
                </TabsTrigger>
                <TabsTrigger value="direccion">Dirección</TabsTrigger>
              </TabsList>
              <TabsContent value="datosPersonales" className="space-y-4">
                <FormField
                  control={form.control}
                  name="nombreCompleto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Pérez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="juan@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="direccion" className="space-y-4">
                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle Principal 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codigoPostal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Postal</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
