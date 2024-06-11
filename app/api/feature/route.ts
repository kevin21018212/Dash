import {NextRequest, NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import prisma from '@/prisma/prisma';
import {findUserByGoogleId} from '@/app/utils/userHelper';

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const google_id = session.user?.email as string;
  const body = await req.json();
  const {title, description, project_id} = body;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const newFeature = await prisma.feature.create({
      data: {
        title,
        description,

        project_id: parseInt(project_id, 10),
        user_id: user.user_id,
      },
    });

    return NextResponse.json({message: 'Feature created', feature: newFeature}, {status: 201});
  } catch (error) {
    console.error('Error creating feature:', error);
    return NextResponse.json({error: 'Something went wrong'}, {status: 500});
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const google_id = session.user?.email as string;
  const {searchParams} = new URL(req.url);
  const featureId = searchParams.get('featureId') as string;
  const {title, description} = await req.json();

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const updatedFeature = await prisma.feature.update({
      where: {feature_id: parseInt(featureId)},
      data: {title, description},
    });

    return NextResponse.json(updatedFeature, {status: 200});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const google_id = session.user?.email as string;
  const {searchParams} = new URL(req.url);
  const featureId = searchParams.get('featureId') as string;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    await prisma.feature.delete({
      where: {feature_id: parseInt(featureId)},
    });

    return NextResponse.json({message: 'Feature deleted successfully'}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'}, {status: 500});
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const google_id = session.user?.email as string;
  const {searchParams} = new URL(req.url);
  const projectId = searchParams.get('project_id') as string;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const features = await prisma.feature.findMany({
      where: {
        user_id: user.user_id,
        project_id: parseInt(projectId),
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json({features}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'}, {status: 500});
  }
}
