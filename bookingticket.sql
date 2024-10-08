PGDMP  :            	    
    {            booking_ticket    16.0 (Debian 16.0-1.pgdg120+1)    16.0     2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    16384    booking_ticket    DATABASE     y   CREATE DATABASE booking_ticket WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE booking_ticket;
                admin    false            �            1259    16410    bookings    TABLE     ~  CREATE TABLE public.bookings (
    id integer NOT NULL,
    seat_id integer NOT NULL,
    student_id character varying(10),
    full_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(10) NOT NULL,
    booking_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.bookings;
       public         heap    admin    false            �            1259    16409    bookings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bookings_id_seq;
       public          admin    false    220            6           0    0    bookings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;
          public          admin    false    219            �            1259    16390    seasons    TABLE     b   CREATE TABLE public.seasons (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE public.seasons;
       public         heap    admin    false            �            1259    16389    seasons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.seasons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.seasons_id_seq;
       public          admin    false    216            7           0    0    seasons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.seasons_id_seq OWNED BY public.seasons.id;
          public          admin    false    215            �            1259    16397    seats    TABLE     �   CREATE TABLE public.seats (
    id integer NOT NULL,
    season_id integer NOT NULL,
    seat_number integer NOT NULL,
    is_booked boolean DEFAULT false NOT NULL
);
    DROP TABLE public.seats;
       public         heap    admin    false            �            1259    16396    seats_id_seq    SEQUENCE     �   CREATE SEQUENCE public.seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.seats_id_seq;
       public          admin    false    218            8           0    0    seats_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;
          public          admin    false    217            �           2604    16413    bookings id    DEFAULT     j   ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);
 :   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
       public          admin    false    220    219    220            �           2604    16393 
   seasons id    DEFAULT     h   ALTER TABLE ONLY public.seasons ALTER COLUMN id SET DEFAULT nextval('public.seasons_id_seq'::regclass);
 9   ALTER TABLE public.seasons ALTER COLUMN id DROP DEFAULT;
       public          admin    false    216    215    216            �           2604    16400    seats id    DEFAULT     d   ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);
 7   ALTER TABLE public.seats ALTER COLUMN id DROP DEFAULT;
       public          admin    false    217    218    218            /          0    16410    bookings 
   TABLE DATA           q   COPY public.bookings (id, seat_id, student_id, full_name, email, phone_number, booking_time, status) FROM stdin;
    public          admin    false    220   �       +          0    16390    seasons 
   TABLE DATA           +   COPY public.seasons (id, name) FROM stdin;
    public          admin    false    216   �       -          0    16397    seats 
   TABLE DATA           F   COPY public.seats (id, season_id, seat_number, is_booked) FROM stdin;
    public          admin    false    218   !       9           0    0    bookings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);
          public          admin    false    219            :           0    0    seasons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.seasons_id_seq', 1, false);
          public          admin    false    215            ;           0    0    seats_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.seats_id_seq', 1, false);
          public          admin    false    217            �           2606    16417    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public            admin    false    220            �           2606    16395    seasons seasons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.seasons DROP CONSTRAINT seasons_pkey;
       public            admin    false    216            �           2606    16403    seats seats_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.seats DROP CONSTRAINT seats_pkey;
       public            admin    false    218            �           2606    16418    bookings bookings_seat_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seats(id);
 H   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_seat_id_fkey;
       public          admin    false    218    220    3222            �           2606    16404    seats seats_season_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id);
 D   ALTER TABLE ONLY public.seats DROP CONSTRAINT seats_season_id_fkey;
       public          admin    false    216    218    3220            /      x������ � �      +   -   x�3�.(��K�2�.��M-�2�tK���2���+�c���� �
�      -   �  x�-�Kr�0ѵ|�	 ~t�Y���0Ȃ�&j<Zi��Ͽ����k���V����u��{ݽ�^O�������׫^��(f��b�+��b�-f��b�/�@�F`F`���cF`F`F`F`F`F`F`$Fb$Fb$F����`$Fb$Fb$Fb$Fb$Fb$FbFaFaFaF��#`Fa�~�������^���7{{�Ë��g�(�Y�N��7f-r����^�v��p�[Lw��x���w��p��6��m���}~���p�����;w0�`8��p���p��_��p���p��.��]��w1�b8��p���p�%0>���W|�����}Ջ�^��û7��;��8��/�כ�q/}�^��{?��e�ܺb��2�����{���`N(��\p4G���X�3Jh�(�9����SJhn)�9��5h9�'h��˳h.�@sR��*�U��
4gU����a�h5__hN�t,k��j����y�ݧ����;��ra߯>^qk}�����+���z~�V.#V
e*��w+��+�T^HSyAM�5��T^hSy�M����B��m*o���Ѧ�F��m*o���Ѧ�F��m*o�Bkm*��|Ц�A��m*��|Ц�A��m*��|\��Es�~~~��o     